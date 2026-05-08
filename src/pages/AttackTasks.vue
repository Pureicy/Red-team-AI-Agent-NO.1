<template>
  <div class="page-stack">
    <SectionCard
      title="红队任务矩阵"
      subtitle="对目标 Agent 发起模拟攻击并自动统计风险结果"
      tone="red"
    >
      <template #extra>
        <el-button class="neon-button" type="danger" @click="dialogVisible = true">
          新建红队任务
        </el-button>
      </template>

      <el-table :data="taskRows" class="themed-table" height="470">
        <el-table-column prop="id" label="任务ID" min-width="150" />
        <el-table-column prop="targetName" label="目标名称" min-width="130" />
        <el-table-column label="攻击类型" min-width="180">
          <template #default="{ row }">
            <div class="inline-tags">
              <el-tag v-for="item in row.attackTypes" :key="item" effect="dark" type="danger">
                {{ item }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="攻击进度" min-width="140">
          <template #default="{ row }">
            <el-progress
              :percentage="row.progress"
              :stroke-width="10"
              :color="progressColor(row.progress)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="successRate" label="成功率" width="100" />
        <el-table-column label="风险等级" width="100">
          <template #default="{ row }">
            <SeverityTag :label="row.riskLevel" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="createdAt" label="创建时间" min-width="160" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button link type="danger" @click="startAttack(row)">启动攻击</el-button>
          </template>
        </el-table-column>
      </el-table>
    </SectionCard>

    <el-dialog v-model="dialogVisible" title="新建红队任务" width="680px" class="glass-dialog">
      <el-form :model="taskForm" label-width="120px">
        <el-form-item label="任务名称">
          <el-input v-model="taskForm.name" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="目标应用名称">
          <el-input v-model="taskForm.targetName" placeholder="请输入目标应用名称" />
        </el-form-item>
        <el-form-item label="目标类型">
          <el-select v-model="taskForm.targetType" placeholder="请选择目标类型">
            <el-option v-for="item in taskTargetTypes" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标地址/API">
          <el-input v-model="taskForm.endpoint" placeholder="https://example.com/api/agent" />
        </el-form-item>
        <el-form-item label="攻击类型">
          <el-select v-model="taskForm.attackTypes" multiple placeholder="请选择攻击类型">
            <el-option v-for="item in taskTypeOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="攻击强度">
          <el-radio-group v-model="taskForm.intensity">
            <el-radio-button label="低" />
            <el-radio-button label="中" />
            <el-radio-button label="高" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多轮攻击">
          <el-switch v-model="taskForm.multiRound" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" class="neon-button" @click="createTask">创建任务</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import SectionCard from '../components/SectionCard.vue'
import SeverityTag from '../components/SeverityTag.vue'
import { attackTasks, taskTargetTypes, taskTypeOptions } from '../data/mock'

const dialogVisible = ref(false)
const taskRows = ref(attackTasks.map((item) => ({ ...item })))

const taskForm = reactive({
  name: '',
  targetName: '',
  targetType: '',
  endpoint: '',
  attackTypes: [],
  intensity: '中',
  multiRound: true
})

const progressColor = (value) => {
  if (value < 40) return '#ff9f43'
  if (value < 80) return '#6cf5ff'
  return '#ff5d7d'
}

const createTask = () => {
  const targetName = taskForm.targetName || '未命名目标'
  taskRows.value.unshift({
    id: `RT-${Date.now().toString().slice(-8)}`,
    targetName,
    attackTypes: taskForm.attackTypes.length ? [...taskForm.attackTypes] : ['提示注入'],
    progress: 0,
    successRate: '0%',
    riskLevel: taskForm.intensity === '高' ? '高危' : taskForm.intensity === '中' ? '中危' : '低危',
    status: '等待中',
    createdAt: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
  })

  dialogVisible.value = false
  Object.assign(taskForm, {
    name: '',
    targetName: '',
    targetType: '',
    endpoint: '',
    attackTypes: [],
    intensity: '中',
    multiRound: true
  })
  ElMessage.success('红队任务已加入队列')
}

const startAttack = (row) => {
  if (row.status === '攻击中') {
    ElMessage.warning('该任务正在执行中')
    return
  }

  row.status = '攻击中'
  const timer = setInterval(() => {
    row.progress = Math.min(row.progress + 8 + Math.floor(Math.random() * 10), 100)
    row.successRate = `${Math.min(95, 18 + Math.floor(row.progress * 0.7))}%`

    if (row.progress >= 100) {
      row.status = '已完成'
      clearInterval(timer)
      ElMessage.success(`${row.targetName} 攻击模拟已完成`)
    }
  }, 520)
}
</script>
